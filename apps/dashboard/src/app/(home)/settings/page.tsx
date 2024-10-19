import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage settings associated with your personal MpesaFlow Account'
}

export default function SettingsPage() {
  return (
    <div className="flex flex-col max-w-5xl w-full mx-auto  gap-5 ">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">Settings</h1>
        <p className="text-gray-500">
          Manage settings associated with your personal MpesaFlow Account
        </p>
      </div>
    </div>
  );
}
