import AccountTab from "@/components/settings/AccountTab";
import AppearanceTab from "@/components/settings/AppearanceTab";
import NotificationsTab from "@/components/settings/NotificationsTab";
import PrivacyTab from "@/components/settings/PrivacyTab";
import SecurityTab from "@/components/settings/SecurityTab";
import { useState } from "react";

type Tab = "account" | "privacy" | "notifications" | "appearance" | "security";

const tabs = [
    { key: "account", label: "Account" },
    { key: "privacy", label: "Privacy" },
    { key: "notifications", label: "Notifications" },
    { key: "appearance", label: "Appearance" },
    { key: "security", label: "Security" },
];

const Settings = () => {
    const [activeTab, setActiveTab] = useState<Tab>("account");

    return (
        <div className="min-h-screen bg-background text-foreground p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Configuración</h1>

                <div className="flex gap-6 flex-col">
                    <aside className="flex flex-row border-b border-border">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key as Tab)}
                                className={`text-left px-4 py-2 cursor-pointer transition ease-in-out font-semibold ${
                                    activeTab === tab.key
                                        ? "border-b-2 border-primary text-primary "
                                        : ""
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </aside>

                  
                    <>
                        {activeTab === "account" && <AccountTab />}
                        {activeTab === "privacy" && <PrivacyTab />}
                        {activeTab === "notifications" && <NotificationsTab />}
                        {activeTab === "appearance" && <AppearanceTab />}
                        {activeTab === "security" && <SecurityTab />}
                    </>
                </div>
            </div>
        </div>
    );
};

export default Settings;
