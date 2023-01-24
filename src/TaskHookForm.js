import React from 'react';
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { toast } from 'react-toastify';



export default function TaskHookForm({submitFn,kisiler}) {
    const {register,handleSubmit,formState:{ errors , isValid },reset} = 
    useForm({
    mode:"onChange",
    defaultValues: {title:"", description:"",people:"" }
  });

  function mySubmit(data) {
    console.log("data",data)
    submitFn({
      ...data,
      id:nanoid(5),
      status: "yapılacak"
    });
    toast.success(data.title + " sıradakii...");
    reset({
      title: "",
      description: "",
      deadline: ""
    });
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(mySubmit)} >
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          {...register("title", {required:"Task başlığı yazmalısınız", 
          minLength: {
            value:3,
            message:"Task başlığı en az 3 karakter olmalı" }
          })}
        />
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>
      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description",{required:"Task açıklaması yazmalısınız",
          minLength:{
            value:10,
            message:"Task açıklaması en az 10 karakter olmalı"
          } })}
        ></textarea>
        {errors.description && (
          <p className="input-error">{errors.description.message}</p>
        )}
      </div>
      <div className="form-line">
        <label className="input-label">
          İnsanlar
        </label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                value={p}
                name="people"
                {...register("people", {
                required: "Lütfen en az bir kişi seçin",
                validate: {
                  ustLimit: (agalar) =>
                  agalar.length <= 3 || "En fazla 3 kişi seçebilirsiniz"
                }
              })}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="input-error">{errors.people.message}</p> )}
        </div>
      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={!isValid}
        >
          Kaydet
        </button>
      </div>

    </form>
  );
}
