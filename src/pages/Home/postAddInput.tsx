import { useCallback } from "react";
import { useForm } from "react-hook-form";
import Input from "@components/Input";
import Button from "@components/Button";
import { isValidPostInput, getId } from "@utils/url";
import { useAddAudio } from "@services/posts";

const PostAddInput: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ url: string }>();
  const addAudio = useAddAudio();

  const onSubmit = useCallback(async (data: { url: string }) => {
    try {
      await addAudio(data.url);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-24px"
    >
      <Input
        type="text"
        {...register("url", {
          required: true,
          validate: isValidPostInput,
          setValueAs: (value) => getId(value),
        })}
        required
        error={!!errors.url}
        title="post's lenster url or post id"
      />
      <Button>Add</Button>
    </form>
  );
};

export default PostAddInput;
