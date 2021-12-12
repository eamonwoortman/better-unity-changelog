import { ChangelogRoot } from "../../features/changelogs/changelog.types";

type ContainerProps = {
    changelog: ChangelogRoot;
    // filters...
}; 



// Easiest way to declare a Function Component; return type is inferred.
export default function ChangelogContainer({ changelog }: ContainerProps) {
    return(
        <div className="text-white font-base text-xs text-center p-1.5 bg-black">
            Changelog, version: {changelog.version}!
        </div>
    )
}
