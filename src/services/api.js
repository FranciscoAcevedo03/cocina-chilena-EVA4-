const API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Chile';

export const fetchPlatosChilenos = async () => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error('No se pudo establecer conexión con la base de datos de recetas.');
    }

    const data = await response.json();

    const platosHidratados = data.meals.map((meal) => ({
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      precio: 0,
      disponible: true
    }));

    return platosHidratados;
  } catch (error) {
    console.error("Error en servicio api.js:", error);
    throw error;
  }
};