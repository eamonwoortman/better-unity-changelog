import { Switch } from '@headlessui/react'

export default function Toggle({ label, enabled, onChange }: { label: string, enabled:boolean, onChange?:(enabled: boolean) => void}) {
  return (
    <Switch.Group>
      <div className="flex w-full items-center justify-between">
        <Switch.Label className="mr-4">{label}</Switch.Label>
        <Switch
          checked={enabled}
          className={`${
            enabled
              ? 'bg-blue-600'
              : 'bg-gray-200'
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          onChange={(e) => {
            if (onChange) {
              onChange(e);
            }
          }}
        >
          <span
            className={`${
              enabled
                ? 'translate-x-6'
                : 'translate-x-1'
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>

  )
}
