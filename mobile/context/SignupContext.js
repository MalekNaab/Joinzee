import { createContext, useContext, useState } from "react";

const SignupContext = createContext(null);

export function SignupProvider({ children }) {
  const [signupData, setSignupData] = useState({
    accountType: "parent",

    parent: {
      fullName: "",
      email: "",
      phone: "",
      relationship: "",
    },

    child: {
      fullName: "",
      dateOfBirth: "",
      age: "",
      gender: "",
      school: "",
    },

    youngPerson: {
      age: "",
      fullName: "",
      email: "",
      phone: "",
      postcode: "",
      gender: "",
      school: "",
      description: "",
    },

    organisation: {
      name: "",
      organisationType: "",
      registrationNumber: "",
      website: "",

      contactName: "",
      contactEmail: "",
      phone: "",
      address: "",
      postcode: "",

      audiences: [],

      description: "",

      logoAdded: false,
      activityImagesAdded: false,
    },

    interests: [],

    permissions: {
      guardian: false,
      terms: false,
      participation: false,
      organiserContact: false,
    },

    notifications: {
      push: true,
      email: true,
      sms: false,
    },
  });

  const updateParent = (field, value) => {
    setSignupData((current) => ({
      ...current,
      parent: {
        ...current.parent,
        [field]: value,
      },
    }));
  };

  const updateChild = (field, value) => {
    setSignupData((current) => ({
      ...current,
      child: {
        ...current.child,
        [field]: value,
      },
    }));
  };

  const updateYoungPerson = (field, value) => {
    setSignupData((current) => ({
      ...current,
      youngPerson: {
        ...current.youngPerson,
        [field]: value,
      },
    }));
  };

  const updateOrganisation = (field, value) => {
    setSignupData((current) => ({
      ...current,
      organisation: {
        ...current.organisation,
        [field]: value,
      },
    }));
  };

  return (
    <SignupContext.Provider
      value={{
        signupData,
        setSignupData,
        updateParent,
        updateChild,
        updateYoungPerson,
        updateOrganisation,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
}

export function useSignup() {
  const value = useContext(SignupContext);

  if (!value) {
    throw new Error(
      "useSignup must be used inside SignupProvider"
    );
  }

  return value;
}
