export default function SplitHeading({ text, className }) {
  return (
    <h1 className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="char"
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
}
