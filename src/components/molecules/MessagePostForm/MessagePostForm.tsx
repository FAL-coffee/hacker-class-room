import { useState, FormEvent } from "react";

import { Props } from "./types";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

export const MessagePostForm = ({ ...props }: Props) => {
  const [message, setMessage] = useState<string>("");
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      submitHandler();
    }
  };

  const submitHandler = (event?: FormEvent) => {
    event?.preventDefault();
    if (!message) return;
    props.onSubmit(message);
    setMessage("");
  };
  return (
    <form onSubmit={submitHandler} id="message-post-form">
      <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
        <InputLabel
          htmlFor="message-post-form_input-box"
          id="message-post-form_label"
        >
          Message
        </InputLabel>
        <OutlinedInput
          id="message-post-form_input-box"
          autoComplete="off"
          type="text"
          autoFocus
          multiline
          rows={3}
          maxRows={4}
          value={message}
          onKeyDown={handleKeyDown}
          onChange={(e) => setMessage(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle Message SendIcon"
                id="message-post-form_post-button"
                type="submit"
                edge="end"
              >
                {<SendIcon color="info" />}
              </IconButton>
            </InputAdornment>
          }
          label="Message"
        />
      </FormControl>
    </form>
  );
};
