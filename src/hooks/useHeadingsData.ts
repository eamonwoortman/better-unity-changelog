import { ReactElement, useContext, useEffect, useState } from "react";
import { ChangelogsContext } from "../layouts/ChangelogsLayout";

export default function useHeadingsData(pageRef: ReactElement) {
  const {
    changelogs
  } = useContext(ChangelogsContext);
  const [nestedHeadings, setNestedHeadings] = useState([]);

  useEffect(() => {
    refreshHeadings();
  }, [changelogs]);

  const refreshHeadings = () => {
    const headingElements = Array.from(
      document.querySelectorAll("h2, h3")
    );
      
    console.log('headings render', headingElements);
    
    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }

  const getNestedHeadings = (headingElements) => {
    const nestedHeadings = [];
  
    headingElements.forEach((heading, index) => {
      const { innerText: title, id } = heading;
  
      if (heading.nodeName === "H2") {
        nestedHeadings.push({ id, title, items: [] });
      } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          title,
        });
      }
    });
  
    return nestedHeadings;
  };

  return { nestedHeadings };
};