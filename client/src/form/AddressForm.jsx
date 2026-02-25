import React from "react";
import Input from "../Components/ui/Input";
import TextArea from "../Components/ui/TextArea";
import Button from "../Components/ui/Button";

const AddressForm = ({
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    buttonName = "Save Address",
}) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
            <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
                {...register("phonenumber")}
                error={errors.phonenumber}
                className="full-width"
            />

            <TextArea
                label="Address"
                placeholder="Enter your address"
                {...register("address")}
                error={errors.address}
                className="full-width"
            />

            <Input label="State" disabled {...register("state")} error={errors.state} />

            <Input
                label="District"
                disabled
                {...register("district")}
                error={errors.district}
            />

            <Input
                label="Country"
                disabled
                {...register("country")}
                error={errors.country}
                className="full-width"
            />

            <div className="full-width">
                <Button buttonName={buttonName} type="main" isSubmitting={isSubmitting} />
            </div>
        </form>
    );
};

export default AddressForm;
