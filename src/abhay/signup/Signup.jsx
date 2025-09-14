import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { cn } from "@/lib/utils.js";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Signup() {
  const [details, setDetails] = useState({
    firstname: "",
    lastname: "",
    role: "",
    location: "",
    phonenumber: 0,
  });

  const [role, setRole] = useState("Select Role");

  useEffect(() => {
    // setting role using the dropdown
    setDetails((prev) => ({
      ...prev,
      role: role,
    }));
  }, [role]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   console.log(details);
  // }, [details]);

  const handleSubmit = (e) => {
    // Add signup logic
    e.preventDefault();
    console.log("Form submitted");
    console.log(e);

    
  };

  return (
    <div className=" w-[100vw] h-[100vh] flex justify-center items-center ">
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-foreground text-white p-4 md:rounded-2xl md:p-8 dark:bg-black h-[80vh] ">
        <h2 className="text-xl font-bold text-accent dark:text-neutral-200">
          Welcome to FieldLedger
        </h2>
        <p className="mt-2 max-w-sm text-sm text-accent dark:text-neutral-300">
          Sign Up for FieldLedger by Providing Some details that we need
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 text-accent">
            <LabelInputContainer>
              <Label htmlFor="firstname" className="text-accent">
                First name
              </Label>
              <Input
                id="firstname"
                placeholder="Tyler"
                type="text"
                className="bg-background text-foreground placeholder:text-[hsl(26 19% 10%)"
                name="firstname"
                value={details.firstname}
                onChange={onChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname" className="text-accent">
                Last name
              </Label>
              <Input
                id="lastname"
                placeholder="Durden"
                type="text"
                className="bg-background text-foreground placeholder:text-[hsl(26 19% 10%)"
                name="lastname"
                value={details.lastname}
                onChange={onChange}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="role" className="text-accent">
              Role
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-30">
                <Button variant="outline" className="text-foreground">
                  {details.role}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-30">
                <DropdownMenuLabel>Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={role} onValueChange={setRole}>
                  <DropdownMenuRadioItem value="Farmer">
                    Farmer
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Packager">
                    Packager
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Buyer">
                    Buyer
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password" className="text-accent">
              Location
            </Label>
            <Input
              id="location"
              placeholder="Enter Location"
              type="text"
              className="bg-background text-foreground placeholder:text-[hsl(26 19% 10%)"
              name="location"
              value={details.location}
              onChange={onChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="twitterpassword" className="text-accent">
              Your Phone Number
            </Label>
            <Input
              id="phonenumber"
              placeholder="Enter Phone Number"
              type="phonenumber"
              className="bg-background text-foreground placeholder:text-[hsl(26 19% 10%)] "
              name="phonenumber"
              value={details.phonenumber}
              onChange={onChange}
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block bg-accent text-foreground h-10 w-full rounded-md  font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-background to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-foreground to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default Signup;
