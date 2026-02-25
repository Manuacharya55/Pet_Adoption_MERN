import ImageInput from "../ui/ImageInput";
import Button from "../ui/Button";

const CategoryForm = ({
  handleSubmit,
  myFunc,
  errors,
  isSubmitting,
  register,
  setValue,
  defaultValue,
}) => {
  return (
    <form onSubmit={handleSubmit(myFunc)} className="form-grid">
      <div className="form-group full-width">
        <label>Category Name</label>
        <input
          type="text"
          placeholder="Enter category name"
          {...register("name")}
          className={errors.name ? "error-border" : ""}
        />
        {errors.name && <span className="error-text">{errors.name.message}</span>}
      </div>

      <ImageInput
        name="image"
        setValue={setValue}
        error={errors.image}
        label="Category Image"
        defaultValue={defaultValue?.image}
      />
      <Button
        type="main"
        buttonName="add category"
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default CategoryForm;
