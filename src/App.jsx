import { useEffect, useState } from "react";

function App() {
  const [shiba, setShiba] = useState([]);
  const [change, setChange] = useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);

    if (change === true) {
      const fetchShiba = async () => {
        await fetch(
          `http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false`
        )
          .then((res) => res.json())
          .then((data) => {
            setShiba(data);
            setLoader(false);
          })
          .catch((err) => {
            console.error(err);
            setLoader(false);
          });
      };
      setChange(false);

      fetchShiba();
    }
  }, [change]);

  return (
    <div className="shibaWorld">
      <h1>
        Shiba <span>World</span>
      </h1>
      <div className="picsShiba">
        {!loader ? (
          shiba.map((url, index) => (
            <div
              className="picShiba"
              key={index}
              style={{ backgroundImage: `url(${url})` }}
              onClick={() => setChange(true)}
            ></div>
          ))
        ) : (
          <div className="loader"></div>
        )}
      </div>
    </div>
  );
}

export default App;
