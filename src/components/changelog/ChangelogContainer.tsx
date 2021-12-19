import { useState } from "react";
import { ChangelogNode, ChangelogRoot } from "../../features/changelogs/changelog.types";
import Chevron from "../generic/Chevron";
import Heading from "../generic/Heading";
import { ExternalLinkIcon } from '@heroicons/react/solid'

type ContainerProps = {
    root: ChangelogRoot;
    // filters...
    showSubCategories?: boolean;
}; 

const ExtendedEntriesNode = function ({ node, depth }) {
  const HeadingStartSize:number = 2;

  return (<>
    <Heading type={`h`+(HeadingStartSize + depth)} className={`dark:text-gray-300 text-gray-600 ${depth < 2 && `font-semibold`}`}>{node.name}</Heading>  
    {node.entries &&
      <ul className="list-disc list-inside m-2">
        {node.entries.map((entry, index) => {
          return (
            <li key={index} className="py-2">
            {entry}
            </li>
          );
        })}
      </ul>
    }

  </>)
}

const ConditionalWrapper = ({ condition, wrapper, children }) => 
  condition ? wrapper(children) : children ?? null;

const SimpleEntriesNode = function ({ node, depth }) {
  const HeadingStartSize:number = 2;

  return (
    <>
      {(depth == 0) && 
        <Heading type={`h`+(HeadingStartSize + depth)} className={`dark:text-gray-300 text-gray-600 pt-15 ${depth == 0 && `font-semibold`}`}>{node.name}</Heading>  
      }
      {node.entries && <>
        {node.entries.map((entry, index) => {
          return (
            <li key={index} className="py-2">
              {node.name}: {entry}
            </li>
          );
        })}
      </>}
    </>
  )
}

const RenderNode = ({node, depth = 0, showSubCategories}: { node: ChangelogNode, depth?:number, showSubCategories:boolean}) => {
    return (
      <>
      {showSubCategories ? (
        <ExtendedEntriesNode {...{node, depth}}/>
      ) : (<SimpleEntriesNode {...{node, depth}}/>)
      }
      <ConditionalWrapper
          condition={depth == 0}
          wrapper={children => 
            <ul className="list-disc list-outside m-5">{children}</ul>
          }>
          {node.children && node.children.map((nodeChild, index) => {
              return (
                <RenderNode
                  key={index}
                  node={nodeChild}
                  depth={depth + 1}
                  showSubCategories={showSubCategories}
                />
              );
          })}
        
        </ConditionalWrapper>
      </>
    );
  };

export default function ChangelogContainer({ root, showSubCategories = false }: ContainerProps) {
    return(
        <>
          <div className="flex space-x-2">
            <h1 className="text-cyan-600">{root.version}</h1>
            <div className="flex items-center justify-center">
              <a href={root.url} target="_blank"><ExternalLinkIcon className="h-5 w-5 text-cyan-600"/></a>
            </div>
          </div>
          {root.categories.children.map((node, index) => (
            <RenderNode key={index} node={node} showSubCategories={showSubCategories} />
          ))}
        </>
    )
}
