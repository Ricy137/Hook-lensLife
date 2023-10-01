import { useCallback } from "react";
import { useForm } from "react-hook-form";
import Input from "@components/Input";
import Button from "@components/Button";
import { isValidPostInput, getId } from "@utils/url";
import { useSearchedAudio } from "@services/posts";

const PostSearcher: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ url: string }>();
  const searchAudio = useSearchedAudio();

  const onSubmit = useCallback(async (data: { url: string }) => {
    try {
      await searchAudio(data.url);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-row gap-x-24px"
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
        placeholder="post's url or post id"
      />
      <Button>Search</Button>
    </form>
  );
};

export default PostSearcher;
