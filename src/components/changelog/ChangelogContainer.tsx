import { ExternalLinkIcon } from '@heroicons/react/solid';
import DOMPurify from 'isomorphic-dompurify';
import { useEffect, useState } from "react";
import { ChangelogNode, ChangelogRoot, ExtendedEntryType } from "../../features/changelogs/changelog.types";
import { filtersSelector } from "../../features/filters/filters.slice";
import { useAppSelector } from "../../helpers/hooks";
import { slugify } from '../../utils/stringutils';
import Anchor from '../generic/Anchor';
import Heading from "../generic/Heading";
import styles from '../styles/Changelog.module.css';

type ContainerProps = {
    id: number;
    root: ChangelogRoot;
}; 

const MissingBadgeColor = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
const LabelColors = {
  'Added': 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900',
  'Removed': 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900',
  'Updated': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900',
  'Fixed': 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800',
  'Changed': 'bg-purple-100 text-purple-800 dark:bg-purple-200 dark:text-purple-900',
  'Improved': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900',
  'Deprecated': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900',
  'Bug': 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900'
}

function CreateLabelBadge(label: string) {
  const color = (label in LabelColors) ? LabelColors[label] : MissingBadgeColor;
  return `<span class='${color} text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'>${label}</span>`
} 

function RenderChangelogEntry (node: ChangelogNode, depth: number, entry: ExtendedEntryType | string) : string {
  if (typeof entry === 'string') {
    return entry;
  }
  const pill = CreateLabelBadge(entry.label)
  return DOMPurify.sanitize(`${entry.title} ${pill}`)
}

const ConditionalWrapper = ({ condition, wrapper, children }) => 
  condition ? wrapper(children) : children ?? null;

type EntriesNodeProps = {
  node:ChangelogNode;
  depth:number;
  id: string; 
}

const ExtendedEntriesNode = function ({ node, depth, id } : EntriesNodeProps) {
  const HeadingStartSize:number = 2;
  const nameSlug:string = slugify(node.name);
  const hrefId: string = `${id}_${nameSlug}`;
  return (<>
    <div className='group/item flex items-center'>
      <Heading type={`h`+(HeadingStartSize + depth)} id={hrefId} className={`dark:text-gray-300 text-gray-600 ${depth < 2 && `font-semibold`}`}>{node.name}</Heading> 
      <a className="group/edit invisible group-hover/item:visible" href={`#${id}_${nameSlug}`}>
        <Anchor className='hover:bg-sky-700'/> 
      </a>
    </div>
    {node.entries &&
      <ul className="list-disc list-inside m-2">
        {node.entries.map((entry, index) => {
          return (
            <li key={index} className="py-2" dangerouslySetInnerHTML={{ __html: RenderChangelogEntry(node, depth, entry)}}/>
          );
        })}
      </ul>
    }

  </>)
}

const SimpleEntriesNode = function ({ node, depth, id } : EntriesNodeProps) {
  const HeadingStartSize:number = 2;
  const nameSlug:string = slugify(node.name);
  const hrefId: string = `${id}_${nameSlug}`;

  return (
    <>
      {(node.type === 'MainCategory' || node.type === 'ChangeType') && 
        <Heading type={`h`+(HeadingStartSize + 1)} id={hrefId} className={`dark:text-gray-300 text-gray-600 pt-15 font-semibold`}>{node.name}</Heading>  
      }
      {node.entries && <>
        {node.entries.map((entry, index) => {
          return (
            <li key={index} className="py-2" dangerouslySetInnerHTML={{ __html: `${node.name}: ${RenderChangelogEntry(node, depth, entry)}` }}/>
          );
        })}
      </>}
    </>
  )
}

type RenderNodeProps = {
  node: ChangelogNode;
  depth?:number;
  showSubCategories:boolean;
  id: string;
}

const RenderNode = ({node, depth = 0, showSubCategories, id}: RenderNodeProps) => {
    return (
      <>
      {showSubCategories ? (
        <ExtendedEntriesNode {...{node, depth, id}}/>
      ) : (<SimpleEntriesNode {...{node, depth, id}}/>)
      }
      <ConditionalWrapper
          condition={showSubCategories ? depth == 0 : (node.type == 'MainCategory' || node.type == 'ChangeType')}
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
                  id={`${id}_${depth}`}
                />
              );
          })}
        
        </ConditionalWrapper>
      </>
    );
  };


export default function ChangelogContainer({ id, root }: ContainerProps) {
  const {category_filters, use_simple_view} = useAppSelector(filtersSelector);
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
    setFilteredCategories(filter(root.categories.children));    
  }
  
  useEffect(() => {
    applyFilters();
  }, [category_filters]);

    return(
        <div className={styles.changelog}>
          <div className="flex space-x-2">
            <h1 id={root.version_string} className="text-cyan-600">{root.version_string}</h1>
            <div className="flex items-center justify-center">
              <a href={root.url} target="_blank"><ExternalLinkIcon className="h-5 w-5 text-cyan-600"/></a>
            </div>
          </div>
          {filteredCategories && filteredCategories.map((node, index) => (
            <RenderNode key={index} node={node} showSubCategories={!use_simple_view} id={`${root.slug}_${index}`} />
          ))}
          {!filteredCategories &&
            (<div>No categories found for {root.slug}</div>)
          }
        </div>
    )
}
