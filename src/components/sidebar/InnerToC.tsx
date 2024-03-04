"use client";
import { NestedHeading } from 'hooks/useHeadingsData';
import { useScrollSpy } from 'hooks/useScrollSpy';
import React from 'react';
import { Headings } from './Headings';

export default function InnerToC({ headings }) {
    const flattenHeadings = (nestedHeadings : NestedHeading[]) => {
        let headingIds:string[] = [];
        nestedHeadings.forEach(heading => {
            headingIds.push(heading.id);
            if (heading.items) {
                const childItemIds = flattenHeadings(heading.items);
                headingIds = [...headingIds, ...childItemIds];
            }
        });
        return headingIds;
    }
    const headingIds = flattenHeadings(headings);
    const activeId = useScrollSpy(
        headingIds,
        { rootMargin: "0% 0% -25% 0%" }
    );

    return (
        <nav aria-label="Table of contents">
            <h5>TABLE OF CONTENTS</h5>
            <Headings headings={headings} activeId={activeId} />
        </nav>
    )
}
