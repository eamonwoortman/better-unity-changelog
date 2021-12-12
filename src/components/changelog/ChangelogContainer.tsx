import { useState } from "react";
import { ChangelogNode, ChangelogRoot } from "../../features/changelogs/changelog.types";

type ContainerProps = {
    root: ChangelogRoot;
    // filters...
}; 

const Node = function ({ node, ...props }) {
    return (
      <div
        className={`my-1 flex flex-row text-left items-center cursor-pointer parent select-none relative rounded pl-2 hover:bg-gray-200 dark:hover:bg-gray-800 `}
        style={{paddingTop: 1, paddingBottom: 1}} {...props}>   
        <span className={`dark:text-gray-300 text-gray-600 font-semibold`}>{node.name}</span>  
            <div className="ml-auto mr-4">
                {node.entries && <div>
                    <span>Entries: {node.entries.length}</span>
                </div>}
            </div>
      </div>
    )
  }

const RenderNode = ({node}: { node: ChangelogNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickHandler = function() {
        setIsOpen(!isOpen);
    }
    return (
      <div>
        <Node node={node} onClick={onClickHandler}/>
         
        {node.children && isOpen && (
          <div
            style={{
              margin: "2px 0px 2px 12px",
              paddingLeft: 10,
              borderLeft: "1px dashed gray",
            }}
          >
            {node.children.map((nodeChild, index) => {
              return (
                <RenderNode
                  key={index}
                  node={nodeChild}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  };

// Easiest way to declare a Function Component; return type is inferred.
export default function ChangelogContainer({ root }: ContainerProps) {
    return(
        <div>
            Changelog, version: {root.version}!
            categories: {root.categories.children.length}
            
            {root.categories.children.map((node, index) => (
                <RenderNode key={index} node={node} />
            ))}
        </div>
    )
}
