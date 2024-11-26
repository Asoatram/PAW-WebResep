export function parseIngredients(input:string) {
    const lines = input.split('\n'); // Split the input into lines
    return lines.map((line) => {
        const [quantity, ...nameParts] = line.split(','); // Split each line at the comma
        return {
            quantity: quantity.trim(), // Extract and trim the quantity
            name: nameParts.join(',').trim().toLowerCase(), // Join and trim the name, converting it to lowercase
        };
    });
}


