import Button from "../ui/Button";

const AddressForm = ({
  handleSubmit,
  myFunc,
  errors,
  isSubmitting,
  register,
}) => {
  return (
    <form onSubmit={handleSubmit(myFunc)}>
      <input
        type="tel"
        placeholder="enter your phone number"
        {...register("phonenumber")}
      />
      {errors?.phonenumber && (
        <span className="error">{errors.phonenumber.message}</span>
      )}
      <textarea
        id=""
        placeholder="enter your address"
        {...register("address")}
      ></textarea>
      {errors?.address && (
        <span className="error">{errors.address.message}</span>
      )}
      <input
        type="text"
        placeholder="your state"
        disabled
        {...register("state")}
      />
      {errors?.state && <span className="error">{errors.state.message}</span>}
      <input
        type="text"
        placeholder="your district"
        disabled
        {...register("district")}
      />
      {errors?.district && (
        <span className="error">{errors.district.message}</span>
      )}
      <input
        type="text"
        placeholder="your country"
        disabled
        {...register("country")}
      />
      {errors?.country && (
        <span className="error">{errors.country.message}</span>
      )}
      <Button
        buttonName="add address"
        type="main"
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default AddressForm;
