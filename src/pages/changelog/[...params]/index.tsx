import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import ChangelogContainer from '../../../components/changelog/ChangelogContainer'
import { changelogSelector } from '../../../features/changelogs/changelog.slice'
import { ChangelogRoot } from '../../../features/changelogs/changelog.types'
import ChangeLogDetailLayout from '../../../layouts/ChangelogDetailLayout'
import {Version, parseVersion} from '../../../utils/vparse'

const ChangelogPage: NextPage = () => {
  const router = useRouter()
  const params = (router.query.params as string[]) || []
  const { changelogs } = useAppSelector(changelogSelector)
  const [selectedChangelogs, setSelectedChangelogs] = useState<ChangelogRoot[]>()

  const getChangelog = (version: string): ChangelogRoot => {
    const match = changelogs.find(x => x.slug == version);
    if (!match) {
      console.log('Failed to find changelog with version: %s', version);
    }
    return match as ChangelogRoot;
  }

/*
  type Version = {
    major: number;
    minor: number;
    patch: number;
    build: number;
    isEmpty?: boolean;
    parsed?: [number, number, number, number];
    text?: string;
  }

  type VersionParseResult = {
    version?: Version;
    success: boolean;
  };
  
  function parseVersion(input) {
    var m = input.match(/\d*\.|\d+/g) || [];
    let v:Version = {
        major: +m[0] || 0,
        minor: +m[1] || 0,
        patch: +m[2] || 0,
        build: +m[3] || 0
    };
    v.isEmpty = !v.major && !v.minor && !v.patch && !v.build;
    v.parsed = [v.major, v.minor, v.patch, v.build];
    v.text = v.parsed.join('.');
    return v;
}*/

  const getChangelogs = (fromQuery: string, toQuery: string) : ChangelogRoot[] => {
    const filteredChangelogs = [];

    const from:Version = parseVersion(fromQuery);
    const to:Version = parseVersion(toQuery);
    if (from.isEmpty || to.isEmpty) {
      console.log(`Could not parse 'from'(${fromQuery}) or 'to'(${toQuery}) queries`);
      return filteredChangelogs;
    }
        
    // map through all changelogs, only allow from parsed from and to version
    changelogs.map((changelog:ChangelogRoot) => {
      const version:Version = parseVersion(changelog.slug);
      const compareFrom = from.compare(version);
      const compareTo = to.compare(version);
      if (compareFrom <= 0 && compareTo >= 0) {
        filteredChangelogs.push(changelog);
      } else {
        return;
      }

    });

    return filteredChangelogs;
  }

  useEffect(() => {
    let changelogs = [];
    console.log(params);
    if (params.length == 1) {
      const matchingChangelog = getChangelog(params[0]);
      changelogs.push(matchingChangelog);
    } else if (params.length == 2) {
      var [ from, to ] = params;
      console.log('from to filter! %s, %s', from, to);
      changelogs = getChangelogs(from, to)
    }
    /*
    if (id !== undefined) {
      console.log('id filter! %s', id);
      const matchingChangelog = getChangelog(id as string);
      changelogs.push(matchingChangelog);
    } else if (from && to) {
      console.log('from to filter! %s, %s', from, to);
    } else {
      console.error('couldnt unpack query: %s', router.query, router.query);
    }*/
    setSelectedChangelogs(changelogs);
  }, [changelogs]);

  return (<>
    <ChangeLogDetailLayout>
      {selectedChangelogs !== undefined && selectedChangelogs.map((changelog:ChangelogRoot, index:number) => (
        <ChangelogContainer key={index} root={changelog} />
        )
      )}
    </ChangeLogDetailLayout>
  </>)
}

export default ChangelogPage
