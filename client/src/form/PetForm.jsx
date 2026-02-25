import React from "react";
import Input from "../Components/ui/Input";
import TextArea from "../Components/ui/TextArea";
import ImageInput from "../Components/ui/ImageInput";
import Button from "../Components/ui/Button";

const PetForm = ({
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    setValue,
    categories,
    buttonName,
    watch,
}) => {
    const imageValue = watch("image");
    console.log(categories);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
            <Input
                label="Pet Name"
                placeholder="Enter pet name"
                {...register("name")}
                error={errors.name}
            />

            <Input
                label="Price"
                type="number"
                placeholder="Enter pet price"
                {...register("price")}
                error={errors.price}
            />
            <ImageInput
                name="image"
                setValue={setValue}
                error={errors.image}
                className="row-item"
                defaultValue={imageValue}
            />

            <TextArea
                label="Description"
                placeholder="Enter pet description"
                {...register("description")}
                error={errors.description}
                className="row-item"
            />

            <Input
                label="Age"
                type="number"
                placeholder="Enter pet age"
                {...register("age")}
                error={errors.age}
            />



            <Input
                label="Breed"
                placeholder="Enter pet breed"
                {...register("breed")}
                error={errors.breed}
            />

            <div className="form-group">
                <label>Gender</label>
                <select
                    {...register("gender")}
                    className={errors.gender ? "error-border" : ""}
                >
                    <option value="">-- select pet gender --</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                </select>
                {errors.gender && (
                    <span className="error-text">{errors.gender.message}</span>
                )}
            </div>

            <div className="form-group">
                <label>Category</label>
                <select
                    {...register("category")}
                    className={errors.category ? "error-border" : ""}
                >
                    <option value="">-- select pet category --</option>
                    {categories?.map((cat) => (
                        <option value={cat._id} key={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                {errors.category && (
                    <span className="error-text">{errors.category.message}</span>
                )}
            </div>

            <div className="full-width">
                <Button
                    type="main"
                    buttonName={buttonName}
                    isSubmitting={isSubmitting}
                />
            </div>
        </form>
    );
};

export default PetForm;
