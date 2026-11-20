
import { useState } from "react";
import { UserRound, Bell, Palette, Save } from "lucide-react";

function Setting({isDark}) {
  const [name, setName] = useState(
    localStorage.getItem("task-manager-name") || ""
  );

  const [email, setEmail] = useState(
    localStorage.getItem("task-manager-email") || ""
  );

  const [notifications, setNotifications] = useState(
    localStorage.getItem("task-manager-notifications") !== "false"
  );

  const [theme, setTheme] = useState(
    localStorage.getItem("task-manager-theme") || "Light"
  );

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem("task-manager-name", name);
    localStorage.setItem("task-manager-email", email);
    localStorage.setItem(
      "task-manager-notifications",
      notifications
    );
    localStorage.setItem("task-manager-theme", theme);

    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Settings
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your profile and preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Settings */}
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <UserRound className="text-teal-600" size={22} />
            <div>
              <h3 className="font-semibold text-gray-800">
                Profile Information
              </h3>
              <p className="text-sm text-gray-500">
                Update your personal details.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </section>

        {/* Appearance Settings */}
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Palette className="text-teal-600" size={22} />
            <div>
              <h3 className="font-semibold text-gray-800">
                Appearance
              </h3>
              <p className="text-sm text-gray-500">
                Choose your preferred theme.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            {["Light", "Dark"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTheme(option)}
                className={`rounded-lg border px-5 py-3 ${
                  theme === option
                    ? "border-teal-600 bg-teal-600 text-white"
                    : isDark
                      ? "border-gray-600 bg-gray-800 text-gray-200"
                      : "border-gray-300 bg-white text-gray-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        {/* Notification Settings */}
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Bell className="text-teal-600" size={22} />
              <div>
                <h3 className="font-semibold text-gray-800">
                  Notifications
                </h3>
                <p className="text-sm text-gray-500">
                  Enable or disable notifications.
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={notifications}
              aria-label="Toggle notifications"
              onClick={() => setNotifications((prev) => !prev)}
              className={`relative h-6 w-11 rounded-full transition ${
                notifications ? "bg-teal-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                  notifications ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-3 font-medium text-white hover:bg-teal-700"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Setting;
