import css from "./Filters.module.css";

const Filters = () => {
    return (
        <div className={css["filters-wrapper"]}>
            <fieldset>
                <legend id="location-heading">Location</legend>
                <input type="text" id="location" name="location" placeholder="Enter location" />
            </fieldset>
        
            <div>
                <h2 id="filters-heading">Filters</h2>
                <fieldset>
                    <legend>Vehicle Equipment</legend>
                    <button type="button" id="equipment1">Option 1</button>
                    <button type="button" id="equipment2">Option 2</button>
                    <button type="button" id="equipment3">Option 3</button>
                </fieldset>
        
                <fieldset>
                    <legend>Vehicle Type</legend>
                    <label>
                        <input type="radio" name="vehicleType" value="type1" />
                        Type 1
                    </label>
                    <label>
                        <input type="radio" name="vehicleType" value="type2" />
                        Type 2
                    </label>
                    <label>
                        <input type="radio" name="vehicleType" value="type3" />
                        Type 3
                    </label>
                </fieldset>
        
                <button type="submit">Search</button>
            </div>
        </div>
    );
}

export default Filters;