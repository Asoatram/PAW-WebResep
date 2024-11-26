export default function BrowsePage() {
    return (
      <div>
        <div>
            <p>Hello Everyone! Browse your type of recipe</p>
            <hr/>
            {/* Render fetched recipes */}
            <div className="grid grid-cols-4 gap-4 m-2">
                {recipes.map((recipe, index) => (
                    <FoodCard
                        id={recipe._id}
                        key={index}
                        title={recipe.title}
                        description={recipe.description}
                        imageSrc={recipe.image_url}
                        author={recipe.author}
                        rating={recipe.difficulty}
                    />
                ))}
            </div>
        </div>
      </div>
    );
  }