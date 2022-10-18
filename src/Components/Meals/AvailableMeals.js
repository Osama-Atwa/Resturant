import { useCallback, useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [Meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const FetchMeals = useCallback(async () => {
    try {
      const response = await fetch(
        "https://react-http-34f49-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      let LoadedMeals = [];

      for (const key in data) {
        LoadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(LoadedMeals);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      setHttpError(error.message);
    }
  }, []);
  useEffect(() => {
    FetchMeals();
  }, [FetchMeals]);

  if (isLoading) {
    return (
      <div className={classes.mealsLoading}>
        <p>Loading...</p>
      </div>
    );
  }

  if (httpError) {
    return (
      <div className={classes.ErrorMessage}>
        <p>{httpError}</p>
      </div>
    );
  }
  // console.log("Meals : " + Meals);
  const mealsList = Meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        name={meal.name}
        id={meal.id}
        description={meal.description}
        price={meal.price}
      />
    );
  });
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
