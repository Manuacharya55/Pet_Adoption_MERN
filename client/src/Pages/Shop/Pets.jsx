import { useEffect, useState } from "react";
import Card from "../../Components/Card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useDelete, useGet, usePost, usePatch } from "../../hooks/apiRequests";
import toast from "react-hot-toast";
import Modal from "../../Components/ui/Modal";
import PetForm from "../../form/PetForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema } from "../../Schema/PetSchema";

const Pets = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPetId, setEditingPetId] = useState(null);

  const { user } = useAuth();
  const url = `/pet/mypets`;

  // Form for Adding
  const addForm = useForm({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: "",
      price: "",
      image: "",
      description: "",
      age: "",
      breed: "",
      gender: "",
      category: ""
    }
  });

  // Form for Editing
  const editForm = useForm({ resolver: zodResolver(petSchema) });

  const fetchPets = async () => {
    setIsLoading(true);
    if (!user?.token) return;
    const response = await useGet(url, user?.token);
    console.log(response)
    if (response.success) {
      setPets(response.data);
    }
    setIsLoading(false);
  };

  const fetchCategories = async () => {
    if (!user?.token) return;
    const response = await useGet("/category/", user?.token);
    if (response.success) {
      setCategories(response.data);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchPets();
      fetchCategories();
    }
  }, [user?.token]);

  const onAddSubmit = async (data) => {
    if (!user?.token) return;
    const response = await usePost("/pet", user?.token, data);
    if (response.success) {
      toast.success(response.message);
      setIsAddModalOpen(false);
      addForm.reset();
      fetchPets();
    } else {
      toast.error(response.message);
    }
  };

  const onEditSubmit = async (data) => {
    if (!user?.token || !editingPetId) return;
    const response = await usePatch(`/pet/${editingPetId}`, user?.token, data);
    if (response.success) {
      toast.success(response.message);
      setIsEditModalOpen(false);
      setEditingPetId(null);
      editForm.reset();
      fetchPets();
    } else {
      toast.error(response.message);
    }
  };

  const openEditModal = (pet) => {
    setEditingPetId(pet._id);
    Object.entries(pet).forEach(([key, value]) => {
      if (key === 'category' && typeof value === 'object') {
        editForm.setValue(key, value._id);
      } else {
        editForm.setValue(key, value);
      }
    });
    setIsEditModalOpen(true);
  };

  const deletePet = async (id) => {
    if (!user?.token) return;
    const response = await useDelete(`/pet/${id}`, user?.token);
    if (response.success) {
      toast.success(response.message);
      setPets((prev) => prev.filter((pet) => pet._id !== id));
    } else {
      toast.error(response.message);
    }
  };

  return isLoading ? (
    "Loading..."
  ) : (
    <>
      <div id="container">
        <div id="navigation">
          <button id="add" onClick={() => setIsAddModalOpen(true)}>
            Add Pets
          </button>
        </div>

        <h1 id="heading">Your pets</h1>

        <div id="card-holder">
          {pets?.length === 0
            ? "No pets yet"
            : pets.map((pet) => (
              <Card heading={pet.name} img={pet.image} key={pet._id}>
                <div className="price-holder">
                  <span className="pet-category">{pet.category?.name}</span>
                  <span className="price">{pet.price}₹</span>
                </div>
                <div className="btn-holder">
                  <button onClick={() => openEditModal(pet)}>edit</button>
                  <button onClick={() => deletePet(pet?._id)}>delete</button>
                </div>
              </Card>
            ))}
        </div>
      </div>

      {/* Add Pet Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Pet"
      >
        <PetForm
          register={addForm.register}
          handleSubmit={addForm.handleSubmit}
          onSubmit={onAddSubmit}
          errors={addForm.formState.errors}
          isSubmitting={addForm.formState.isSubmitting}
          setValue={addForm.setValue}
          watch={addForm.watch}
          categories={categories}
          buttonName="Add Pet"
        />
      </Modal>

      {/* Edit Pet Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Pet"
      >
        <PetForm
          register={editForm.register}
          handleSubmit={editForm.handleSubmit}
          onSubmit={onEditSubmit}
          errors={editForm.formState.errors}
          isSubmitting={editForm.formState.isSubmitting}
          setValue={editForm.setValue}
          watch={editForm.watch}
          categories={categories}
          buttonName="Update Pet"
        />
      </Modal>
    </>
  );
};

export default Pets;
