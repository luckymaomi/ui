from __future__ import annotations

import argparse
import functools
import http.server
import json
import os
import shutil
import socketserver
import subprocess
import sys
import threading
import webbrowser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"
BASE = "/ui"


class PreviewHandler(http.server.SimpleHTTPRequestHandler):
    server_version = "ui-static-preview/1.0"

    def do_GET(self) -> None:
        path = urlsplit(self.path).path
        if path == "/":
            self.send_response(302)
            self.send_header("Location", f"{BASE}/")
            self.end_headers()
            return
        if path == BASE:
            self.send_response(308)
            self.send_header("Location", f"{BASE}/")
            self.end_headers()
            return
        if not path.startswith(f"{BASE}/"):
            self.send_error(404, "Not Found")
            return
        super().do_GET()

    def translate_path(self, request_path: str) -> str:
        path = unquote(urlsplit(request_path).path)
        relative = path[len(BASE) :].lstrip("/") if path.startswith(BASE) else ""
        candidate = (DIST / relative).resolve()
        if DIST.resolve() not in (candidate, *candidate.parents):
            return str(DIST / "__invalid_path__")
        if candidate.is_dir():
            candidate = candidate / "index.html"
        return str(candidate)

    def log_message(self, format: str, *args: object) -> None:
        sys.stdout.write(f"[preview] {self.address_string()} {format % args}\n")


class ThreadingServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True

    def handle_error(self, request: object, client_address: object) -> None:
        error = sys.exc_info()[1]
        if isinstance(
            error,
            (BrokenPipeError, ConnectionAbortedError, ConnectionResetError),
        ):
            return
        super().handle_error(request, client_address)


def npm_command() -> str:
    command = "npm.cmd" if os.name == "nt" else "npm"
    resolved = shutil.which(command)
    if not resolved:
        raise RuntimeError(f"未找到 {command}，请先安装 Node.js 与 npm。")
    return resolved


def build() -> None:
    result = subprocess.run(
        [npm_command(), "run", "build"],
        cwd=ROOT,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(f"生产构建失败，退出码 {result.returncode}。")


def check() -> None:
    package_path = ROOT / "package.json"
    config_path = ROOT / "astro.config.mjs"
    if not package_path.is_file() or not config_path.is_file():
        raise RuntimeError("缺少 package.json 或 astro.config.mjs。")
    package = json.loads(package_path.read_text(encoding="utf-8"))
    required_scripts = {"build", "check", "lint", "test", "verify"}
    scripts = package.get("scripts", {})
    missing = sorted(required_scripts - scripts.keys())
    if missing:
        raise RuntimeError(f"package.json 缺少命令：{', '.join(missing)}")
    config = config_path.read_text(encoding="utf-8")
    for fact in ('base: "/ui"', 'output: "static"', 'trailingSlash: "always"'):
        if fact not in config:
            raise RuntimeError(f"Astro 生产配置缺少：{fact}")
    npm = npm_command()
    npm_result = subprocess.run(
        [npm, "--version"], cwd=ROOT, capture_output=True, text=True, check=False
    )
    if npm_result.returncode != 0:
        raise RuntimeError("npm 无法执行。")
    index = DIST / "index.html"
    if not index.is_file():
        raise RuntimeError("dist/index.html 不存在，请先运行生产构建。")
    print(
        json.dumps(
            {
                "status": "ok",
                "base": BASE,
                "dist": str(DIST),
                "npm": npm_result.stdout.strip(),
            },
            ensure_ascii=False,
        )
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="构建并托管 ui 的生产静态产物。")
    parser.add_argument("--port", type=int, default=4567)
    parser.add_argument("--no-build", action="store_true")
    parser.add_argument("--no-open", action="store_true")
    parser.add_argument("--check", action="store_true")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        if args.check:
            check()
            return 0
        if not args.no_build:
            build()
        if not (DIST / "index.html").is_file():
            raise RuntimeError("dist 不完整，无法启动生产预览。")
        if not 0 <= args.port <= 65535:
            raise RuntimeError("端口必须在 0 到 65535 之间。")
        handler = functools.partial(PreviewHandler, directory=str(DIST))
        with ThreadingServer(("127.0.0.1", args.port), handler) as server:
            port = server.server_address[1]
            url = f"http://127.0.0.1:{port}{BASE}/"
            print(f"生产静态站已挂载：{url}", flush=True)
            if not args.no_open:
                threading.Timer(0.4, webbrowser.open, args=[url]).start()
            try:
                server.serve_forever()
            except KeyboardInterrupt:
                print("\n生产预览已停止。")
        return 0
    except (OSError, RuntimeError, json.JSONDecodeError) as error:
        print(f"错误：{error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
