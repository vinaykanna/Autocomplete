import React from "react";
import "./App.css";

type ListItem = {
  name: string;
  link: string;
};

const listItems: Array<ListItem> = [
  { name: "Google", link: "http://google.com" },
  { name: "Microsoft", link: "http://microsoft.com" },
  { name: "Mozilla", link: "https://developer.mozilla.org/en-US/" },
  { name: "Brave", link: "https://brave.com" },
  { name: "Facebook", link: "https://facebook.com" },
  { name: "Instagram", link: "https://instagram.com" },
  { name: "Apple", link: "https://apple.com" },
  { name: "Amazon", link: "https://amazon.com" },
  { name: "Flipkart", link: "https://flipkart.com" },
  { name: "Paytm", link: "https://paytm.com" },
  { name: "Phonepe", link: "https://phonepe.com" },
  { name: "Youtube", link: "https://youtube.com" },
  { name: "Netflix", link: "https://netflix.com" },
  { name: "Prime Video", link: "https://primevideo.com" },
  { name: "MX Player", link: "https://mxplayer.in" },
  { name: "Medium", link: "https://medium.com" },
  { name: "W3 Schools", link: "https://w3schools.com" },
  { name: "Udemy", link: "https://udemy.com" },
];

type State = {
  listItems: Array<ListItem>;
  filteredItems: Array<ListItem>;
  query: string;
  cursor: number;
};

function App() {
  const [state, setState] = React.useState<State>({
    listItems: listItems,
    filteredItems: [],
    query: "",
    cursor: 0,
  });

  const linkRefs: Array<HTMLAnchorElement | null> = [];

  function searchHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    const searchValue = e.currentTarget.value.toLowerCase();

    const filteredItems = state.listItems.filter((item) => {
      return item.name.toLowerCase().indexOf(searchValue) !== -1;
    });

    setState({
      ...state,
      query: e.currentTarget.value,
      filteredItems: filteredItems,
    });

    if (!state.query) return;

    if (
      e.key === "ArrowDown" &&
      state.cursor < state.filteredItems.length - 1
    ) {
      setState((prevState) => {
        return {
          ...state,
          cursor: prevState.cursor + 1,
        };
      });
    }

    if (e.key === "ArrowUp" && state.cursor > 0) {
      setState((prevState) => {
        return {
          ...state,
          cursor: prevState.cursor - 1,
        };
      });
    }

    if (e.key === "Backspace") {
      setState((prevState) => {
        return {
          ...prevState,
          cursor: 0,
        };
      });
    }

    if (e.key === "Enter") {
      linkRefs[state.cursor]?.click();
    }
  }

  function getHighlightedText(text: string, highlight: string) {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    console.log(parts);
    return (
      <>
        {parts.map((part) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span className="highlight">{part}</span>
          ) : (
            part
          )
        )}
      </>
    );
  }

  return (
    <>
      <div className="container">
        <input
          placeholder="Search Here...."
          type="text"
          onKeyUp={searchHandler}
          autoFocus
        />
        {state.query && state.filteredItems.length !== 0 ? (
          <div className="menu_container">
            {state.filteredItems.map((item, index) => (
              <p key={index} className={state.cursor === index ? "active" : ""}>
                <a
                  key={index}
                  href={item.link}
                  ref={(ref) => (linkRefs[index] = ref)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {getHighlightedText(item.name, state.query)}
                </a>
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
