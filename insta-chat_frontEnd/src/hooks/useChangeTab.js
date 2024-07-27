import { useLocation } from "react-router-dom";

const useChangeTab = () => {
  const location = useLocation();
  const handleTabClick = (tab, setCurrentTab) => {
    setCurrentTab((prev) => {
      const newTabsState = {};
      for (let key in prev) {
        newTabsState[key] = false; // ervery thing in current tab is now false;
      }
      newTabsState[tab] = true; // only changing the clicked tab true;
      console.log(newTabsState["search"], "thisisipathname");
      if (tab === "search" || tab === "notification" || tab === "more") {
        //search tab true
        if (prev["search"] === true && tab === "search") {
          //cheacking prev state of search is true and click on search
          const path =
            location.pathname === "/" ? "home" : location.pathname.slice(1);
          console.log(path, "thisisipathname");
          newTabsState[tab] = false;
          newTabsState[path] = true;
          return newTabsState;
        } else if (prev["notification"] === true && tab === "notification") {
          //cheacking prev state of notification is true and click on search
          const path =
            location.pathname === "/" ? "home" : location.pathname.slice(1);
          console.log(path, "thisisipathname");
          newTabsState[tab] = false;
          newTabsState[path] = true;
          return newTabsState;
        } else if (prev["create"] === true && tab === "create") {
          //cheacking prev state of notification is true and click on search
          const path =
            location.pathname === "/" ? "home" : location.pathname.slice(1);
          console.log(path, "thisisipathname");
          newTabsState[tab] = false;
          newTabsState[path] = true;
          return newTabsState;
        } else if (prev["more"] === true && tab === "more") {
          const path =
            location.pathname === "/" ? "home" : location.pathname.slice(1);
          console.log(path, "thisisipathname");
          newTabsState[tab] = false;
          newTabsState[path] = true;
          return newTabsState;
        }
      }
      return newTabsState;
    });
  };
  return handleTabClick;
};

export default useChangeTab;
