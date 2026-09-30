import { useEffect, useState } from "react";

import { ITEM_CATEGORIES, ITEM_STATUSES, toDateInputValue } from "../constants";
import { ErrorMessage } from "./PageState";

function createInitialValues(item, type) {
  return {
    title: item?.title || "",
    description: item?.description || "",
    category: item?.category || "",
    location: item?.location || "",
    date: toDateInputValue(item?.date),
    type: item?.type || type || "lost",
    imageUrl: item?.imageUrl || "",
    status: item?.status || "active",
  };
}

export function ItemForm({ item, type, onSubmit, isSubmitting, submitLabel }) {
  const [values, setValues] = useState(() => createInitialValues(item, type));
  const [error, setError] = useState("");

  useEffect(() => {
    setValues(createInitialValues(item, type));
  }, [item, type]);

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (
      !values.title.trim() ||
      !values.description.trim() ||
      !values.category ||
      !values.location.trim() ||
      !values.date
    ) {
      setError("Complete all required fields before submitting.");
      return;
    }

    if (values.title.trim().length < 3 || values.description.trim().length < 10) {
      setError("Use at least 3 characters for the title and 10 for the description.");
      return;
    }

    if (new Date(values.date) > new Date()) {
      setError("The item date cannot be in the future.");
      return;
    }

    if (values.imageUrl) {
      try {
        const imageUrl = new URL(values.imageUrl);
        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          throw new Error();
        }
      } catch {
        setError("Enter a valid http(s) image URL or leave the field blank.");
        return;
      }
    }

    await onSubmit({
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
      location: values.location.trim(),
      imageUrl: values.imageUrl.trim(),
    });
  }

  return (
    <form className="item-form" onSubmit={handleSubmit} noValidate>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="form-grid">
        <label>
          Item title <span aria-hidden="true">*</span>
          <input
            name="title"
            value={values.title}
            onChange={updateField}
            minLength="3"
            maxLength="120"
            required
            disabled={isSubmitting}
          />
        </label>
        <label>
          Category <span aria-hidden="true">*</span>
          <select
            name="category"
            value={values.category}
            onChange={updateField}
            required
            disabled={isSubmitting}
          >
            <option value="">Select a category</option>
            {ITEM_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          Location <span aria-hidden="true">*</span>
          <input
            name="location"
            value={values.location}
            onChange={updateField}
            maxLength="160"
            required
            disabled={isSubmitting}
            placeholder="e.g. Main library, second floor"
          />
        </label>
        <label>
          Date <span aria-hidden="true">*</span>
          <input
            type="date"
            name="date"
            value={values.date}
            onChange={updateField}
            max={new Date().toISOString().slice(0, 10)}
            required
            disabled={isSubmitting}
          />
        </label>
        <label>
          Listing type <span aria-hidden="true">*</span>
          <select
            name="type"
            value={values.type}
            onChange={updateField}
            disabled={Boolean(type) || isSubmitting}
          >
            <option value="lost">Lost item</option>
            <option value="found">Found item</option>
          </select>
        </label>
        {item && (
          <label>
            Status
            <select name="status" value={values.status} onChange={updateField} disabled={isSubmitting}>
              {Object.entries(ITEM_STATUSES).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <label>
        Description <span aria-hidden="true">*</span>
        <textarea
          name="description"
          value={values.description}
          onChange={updateField}
          minLength="10"
          maxLength="2000"
          rows="6"
          required
          disabled={isSubmitting}
          placeholder="Include distinguishing details that can help identify the item."
        />
      </label>
      <label>
        Image URL <span className="field-hint">(optional)</span>
        <input
          type="url"
          name="imageUrl"
          value={values.imageUrl}
          onChange={updateField}
          maxLength="2048"
          disabled={isSubmitting}
          placeholder="https://example.com/item-photo.jpg"
        />
      </label>

      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
