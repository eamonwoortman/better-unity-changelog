import { Switch } from '@headlessui/react';
import { useState } from 'react';

export default function Toggle({label, initialState, onChange}: { label: string, initialState?:boolean, onChange?:(enabled: boolean) => void}) {
  const [enabled, setEnabled] = useState(initialState)

  return (
    <Switch.Group>
        <div className="flex w-full items-center justify-between">
            <Switch.Label className="mr-4">{label}</Switch.Label>
            <Switch
            checked={enabled}
            onChange={(e) => { setEnabled(e); if (onChange) onChange(e)}}
            className={`${
                enabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
            <span
                className={`${
                enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
            </Switch>
        </div>
    </Switch.Group>

  )
}