import { ExternalLinkIcon } from '@heroicons/react/solid';
import DOMPurify from 'dompurify';
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { ChangelogNode, ChangelogRoot, ExtendedEntryType } from "../../features/changelogs/changelog.types";
import { filtersSelector } from "../../features/filters/filters.slice";
import Heading from "../generic/Heading";

type ContainerProps = {
    root: ChangelogRoot;
    // filters...
    showSubCategories?: boolean;
}; 

const MissingBadgeColor = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
const LabelColors = {
  'Added': 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900',
  'Removed': 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900',
  'Updated': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900',
  'Fixed': 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800',
  'Changed': 'bg-purple-100 text-purple-800 dark:bg-purple-200 dark:text-purple-900',
  'Improved': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900',
  'Deprecated': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900'
}

function CreateLabelBadge(label: string) {
  const color = (label in LabelColors) ? LabelColors[label] : MissingBadgeColor;
  return `<span class='${color} text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'>${label}</span>`
} 

function RenderChangelogEntry (entry: ExtendedEntryType | string) : string {
  if (typeof entry === 'string') {
    return entry;
  }
  const pill = CreateLabelBadge(entry.label)
  return DOMPurify.sanitize(`${entry.title} ${pill}`)
}


const ExtendedEntriesNode = function ({ node, depth }) {
  const HeadingStartSize:number = 2;

  return (<>
    <Heading type={`h`+(HeadingStartSize + depth)} className={`dark:text-gray-300 text-gray-600 ${depth < 2 && `font-semibold`}`}>{node.name}</Heading>  
    {node.entries &&
      <ul className="list-disc list-inside m-2">
        {node.entries.map((entry, index) => {
          return (
            <li key={index} className="py-2" dangerouslySetInnerHTML={{ __html: RenderChangelogEntry(entry)}}/>
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
              <div dangerouslySetInnerHTML={{ __html: `${node.name}: ${RenderChangelogEntry(entry)}` }}></div>
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
  const {category_filters} = useAppSelector(filtersSelector);
  const [filteredCategories, setFilteredCategories] = useState<ChangelogNode[]>(root.categories.children);
  

  function filter(nodes:ChangelogNode[]) {
    var matches = [];
    if (!Array.isArray(nodes)) return matches;

    nodes.forEach(function(node) {
        if (category_filters.some(u => u.name.includes(node.name)) || !category_filters.length) {
          matches.push(node);
        } else {
            let childResults = filter(node.children);
            if (childResults.length)
                matches.push(Object.assign({}, node, { children: childResults }));
        }
    })
    return matches;
  }

  const applyFilters = () => {
    console.log(category_filters);
    setFilteredCategories(filter(root.categories.children));    
  }
  
  useEffect(() => {
    applyFilters();
  }, [category_filters]);

    return(
        <>
          <div className="flex space-x-2">
            <h1 className="text-cyan-600">{root.version}</h1>
            <div className="flex items-center justify-center">
              <a href={root.url} target="_blank"><ExternalLinkIcon className="h-5 w-5 text-cyan-600"/></a>
            </div>
          </div>
          {filteredCategories.map((node, index) => (
            <RenderNode key={index} node={node} showSubCategories={showSubCategories} />
          ))}
        </>
    )
}
