import { useState } from "react";
import { ChangelogNode, ChangelogRoot } from "../../features/changelogs/changelog.types";
import Chevron from "../generic/Chevron";
import Heading from "../generic/Heading";
import { LinkIcon } from '@heroicons/react/solid'

type ContainerProps = {
    root: ChangelogRoot;
    // filters...
    showSubCategories?: boolean;
}; 

const ExtendedEntriesNode = function ({ node, depth }) {
  const HeadingStartSize:number = 2;

  return (
    <>
      <Heading type={`h`+(HeadingStartSize + depth)} className={`dark:text-gray-300 text-gray-600 font-semibold`}>{node.name}</Heading>  

      {node.entries &&
          <ul className="list-disc">
              {node.entries.map((entry) => {
                return (
                  <li>
                    {entry}
                  </li>
                );
              })}
            </ul>
      }
    </>
  )
}

const ConditionalWrapper = ({ condition, wrapper, children }) => 
  condition ? wrapper(children) : children;

const SimpleEntriesNode = function ({ node, depth }) {
  const HeadingStartSize:number = 2;

  return (
    <>
    {(depth == 0) && 
      <Heading type={`h`+(HeadingStartSize + depth)} className={`dark:text-gray-300 text-gray-600 font-semibold`}>{node.name}</Heading>  
    }

      {node.entries && <>
        <ConditionalWrapper
        condition={depth == 0 && node.entries}
        wrapper={children => <ul className="list-disc">{children}</ul>}
      >
              {node.entries.map((entry, index) => {
                return (
                  <li key={index}>
                    {node.name}: {entry}
                  </li>
                );
              })}
                    </ConditionalWrapper>
        </>
      }

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
        
        {node.children && (
          <div>
            {node.children.map((nodeChild, index) => {
              return (
                <RenderNode
                  key={index}
                  node={nodeChild}
                  depth={depth + 1}
                  showSubCategories={showSubCategories}
                />
              );
            })}
          </div>
        )}
      </>
    );
  };

// Easiest way to declare a Function Component; return type is inferred.
export default function ChangelogContainer({ root, showSubCategories = false }: ContainerProps) {
    return(
        <div>
              <a href={root.url} target="_blank" className="no-underline hover:underline text-cyan-600">
                <div className="flex space-x-2">
                  <h1>{root.version}</h1>
                  <div className="flex items-center justify-center"><LinkIcon className="h-10 w-10 text-blue-500"/></div>
                </div>
              </a>
            
              {root.categories.children.map((node, index) => (
                  <RenderNode key={index} node={node} showSubCategories={showSubCategories} />
              ))}
        </div>
    )
}
