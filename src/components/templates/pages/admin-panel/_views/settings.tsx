"use client";

import { useState } from "react";
import { CheckCircle } from "@/components/IconShim";

export function SettingsView() {
  const [form, setForm] = useState({
    siteName: "UI Library Admin",
    timezone: "UTC+8",
    language: "en",
    emailNotifications: true,
    twoFactor: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure system preferences and defaults
        </p>
      </div>

      {/* General */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
        <h2 className="text-sm font-semibold text-gray-900">General</h2>
        <div className="space-y-1">
          <label
            htmlFor="ui-settings-field-1"
            className="block text-sm font-medium text-gray-700"
          >
            Site Name
          </label>
          <input
            id="ui-settings-field-1"
            type="text"
            value={form.siteName}
            onChange={(e) => setForm({ ...form, siteName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400 transition-colors"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="ui-settings-field-2"
            className="block text-sm font-medium text-gray-700"
          >
            Timezone
          </label>
          <select
            id="ui-settings-field-2"
            value={form.timezone}
            onChange={(e) => setForm({ ...form, timezone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-indigo-400 transition-colors"
          >
            <option value="UTC">UTC</option>
            <option value="UTC+8">UTC+8 (CST)</option>
            <option value="UTC-5">UTC-5 (EST)</option>
            <option value="UTC-8">UTC-8 (PST)</option>
            <option value="UTC+1">UTC+1 (CET)</option>
          </select>
        </div>
        <div className="space-y-1">
          <label
            htmlFor="ui-settings-field-3"
            className="block text-sm font-medium text-gray-700"
          >
            Language
          </label>
          <select
            id="ui-settings-field-3"
            value={form.language}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-indigo-400 transition-colors"
          >
            <option value="en">English</option>
            <option value="zh">Chinese (Simplified)</option>
            <option value="ja">Japanese</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Preferences</h2>
        <div className="flex items-center justify-between">
          <div>
            <label
              htmlFor="admin-email-notifications"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              Email Notifications
            </label>
            <p className="text-xs text-gray-400 mt-0.5">
              Receive alerts for important events
            </p>
          </div>
          <input
            id="admin-email-notifications"
            type="checkbox"
            checked={form.emailNotifications}
            onChange={(event) =>
              setForm({ ...form, emailNotifications: event.target.checked })
            }
            className="sr-only"
          />
          <span
            aria-hidden="true"
            className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
              form.emailNotifications ? "bg-indigo-500" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                form.emailNotifications ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <label
              htmlFor="admin-two-factor"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              Two-Factor Authentication
            </label>
            <p className="text-xs text-gray-400 mt-0.5">
              Add an extra layer of security
            </p>
          </div>
          <input
            id="admin-two-factor"
            type="checkbox"
            checked={form.twoFactor}
            onChange={(event) =>
              setForm({ ...form, twoFactor: event.target.checked })
            }
            className="sr-only"
          />
          <span
            aria-hidden="true"
            className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
              form.twoFactor ? "bg-indigo-500" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                form.twoFactor ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Save Changes
        </button>
        {saved && (
          <div className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
            <CheckCircle className="w-4 h-4" />
            Saved successfully
          </div>
        )}
      </div>
    </div>
  );
}
