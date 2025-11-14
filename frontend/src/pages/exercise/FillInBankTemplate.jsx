import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

const SIZE_VARIANTS = {
  small: {
    className: "text-sm",
  },
  medium: {
    className: "text-md",
  },
  large: {
    className: "text-lg",
  },
};

export function FillInBankTemplate({
  context = "",
  word = "",
  input_word = "",
  setInputWord = () => {},
  submitted = false,
  action_button = <Button text="Submit" />,
  size = "medium",
  className = "",
  prefix = <span></span>,
  postfix = <span></span>
}) {
  const styles = SIZE_VARIANTS[size] || SIZE_VARIANTS.medium;

  function getInputClass() {
    if (!submitted) return "";
    if (input_word === word) return `text-green-600 font-semibold`;
    return `text-red-600 font-semibold`;
  }

  return (
    <div className={styles.className + " " + className}>
      <div className={`flex flex-wrap items-baseline leading-relaxed`}>
        {prefix}

        {context.split(" ").map((token, i) => {
          if (token.toLowerCase().includes(word.toLowerCase())) {
            return (
              <Input
                key={i}
                className={`mr-1 w-fit ${submitted ? "cursor-not-allowed" : ""}`}
                inputClassName={`${getInputClass()}`}
                padding="px-1 py-0.5"
                placeholder="Fill in"
                value={input_word}
                onChange={(e) => setInputWord(e.target.value)}
                disabled={submitted}
              />
            );
          }
          return (
            <span key={i} className="mr-1">
              {token}
            </span>
          );
        })}

        {postfix}
      </div>

      {typeof action_button === "function" ? action_button() : action_button}
    </div>
  );
}
