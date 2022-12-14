import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../pages/RecipeCard";

const Form = () => {
  const [searchBar, setSearchBar] = useState(null);
  const [meal, setMeal] = useState(null);
  const [data, setData] = useState(null);

  const api_key = "9106687aa002608785d98d2e5bf2c844";
  const app_id = "795a37fe";

  const getApi = () => {
    axios
      .get(
        `https://api.edamam.com/search?q=${searchBar}&app_id=${app_id}&app_key=${api_key}&mealType=${meal}`
      )
      .then((res) => {
        console.log(res.data.hits);
        setData(res.data.hits);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center mt-5 flex-wrap ">
        <div className="flex gap-3 bg-black rounded-3xl">
          <input
            type="text"
            className="bg-black text-white p-2 rounded-xl active:border-none "
            placeholder="Search"
            onChange={(e) => {
              setSearchBar(e.target.value);
            }}
          />

          <select
            className="rounded-xl bg-black text-white p-1"
            onChange={(e) => {
              setMeal(e.target.value);
            }}
          >
            <option value="breakfast">Breakfast</option>
            <option value="brunch">Brunch</option>
            <option value="lunch">Lunch/Dinner</option>
            <option value="snack">Snack</option>
            <option value="teatime">Teatime</option>
          </select>
          <button
            className="rounded-xl bg-black text-white p-2 w-[7rem] ml-5"
            onClick={() => getApi()}
          >
            <IoSearch className="w-[5 rem] text-2xl" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center mt-10 ">
        {data && data.map((item, idx) => <RecipeCard data={item} key={idx} />)}
      </div>
    </>
  );
};

export default Form;
