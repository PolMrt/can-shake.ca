"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { settingsAtom, showSettingsModalAtom } from "@/atoms/atoms";
import { Settings } from "@/type/settings";
import { on } from "events";

export function SettingsModal() {
  const [showSettingsModal, setShowSettingsModal] = useAtom(
    showSettingsModalAtom
  );
  const [settings, setSettings] = useAtom(settingsAtom);
  const [formState, setFormState] = useState<Settings>(settings);

  const onClose = () => {
    setShowSettingsModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(formState);
    onClose();
  };

  if (!showSettingsModal) return null;

  return (
    <div className="relative z-50">
      <button
        onClick={onClose}
        className="fixed inset-0 bg-black opacity-50 w-full h-full"
      />
      <div className="bg-white p-6 rounded shadow-lg w-96 z-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-xl mb-4">Edit Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="datetime-local"
              name="startTime"
              value={formState.startTime}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="datetime-local"
              name="endTime"
              value={formState.endTime}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Minimum Magnitude
            </label>
            <input
              type="number"
              name="minMagnitude"
              min={0}
              max={10}
              value={formState.minMagnitude}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1.5 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
