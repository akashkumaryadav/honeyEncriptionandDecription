import { useState } from "react";
import axios from "axios";
import TopNavigationMenu from "@/components/NavigationMenu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Encryption() {
  // Encryption states
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [encryptedValue, setEncryptedValue] = useState("");
  const [symmetricKey, setSymmetricKey] = useState("");

  // Decryption states
  const [decryptionInput, setDecryptionInput] = useState("");
  const [decryptedValue, setDecryptedValue] = useState("");
  const [decryptionError, setDecryptionError] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    setError("");
  };

  const handleEncrypt = async (
    _e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    if (!value) {
      setError("Empty strings cannot be encrypted");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/encrypt", {
        plainText: value,
      });

      if (response.data) {
        setEncryptedValue(response.data.encryptedText);
        setSymmetricKey(response.data.key);
        setError("");
      }
    } catch (err) {
      setError("Encryption failed. Please try again.");
      console.error(err);
    }
  };

  const handleDecrypt = async (
    _e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    if (!decryptionInput) {
      setDecryptionError("Empty strings cannot be decrypted");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/api/decrypt", {
        params: {
          encryptedText: decryptionInput,
          key: symmetricKey,
        },
      });

      if (response.data) {
        setDecryptedValue(response.data.decryptedText);
        setDecryptionError("");
      }
    } catch (err) {
      setDecryptionError("Decryption failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <TopNavigationMenu />
      <main className="flex flex-col justify-stretch items-center gap-8 p-4">
        {/* Encryption Section */}
        <section className="flex flex-col w-2/3 gap-4 justify-center items-center align-middle">
          <div className="flex w-ful items-center align-middle l gap-2 fle-row">
            <span className="w-full flex flex-col">
              <p>To Encrypt</p>

              <Input
                value={value}
                placeholder="Enter a string for encryption"
                onChange={handleOnChange}
              />
              <p className="text-destructive min-h-4">{error}</p>
            </span>
            <Button className="mt-2" onClick={handleEncrypt}>
              Encrypt
            </Button>
          </div>

          {encryptedValue && (
            <div className="p-4 border rounded-md">
              <p>Encrypted Result: {encryptedValue}</p>
              <p>Generated Symmetric Key: {symmetricKey}</p>
            </div>
          )}
        </section>

        {/* Decryption Section */}
        <section className="flex flex-col w-2/3 gap-4">
          <div className="flex w-full gap-2">
            <span className="w-full flex flex-col gap-2">
              <p>To Decrypt</p>

              <Input
                value={decryptionInput}
                placeholder="Enter encrypted string"
                onChange={(e) => setDecryptionInput(e.target.value)}
              />
              <p>Key</p>

              <Input
                value={symmetricKey}
                placeholder="Put Symmetric Key"
                onChange={(e) => setSymmetricKey(e.target.value)}
              />
              <p className="text-destructive min-h-4">{decryptionError}</p>
            </span>
          </div>
          <Button onClick={handleDecrypt}>Decrypt</Button>
          {decryptedValue && (
            <div className="p-4 border rounded-md">
              <p>Decrypted Text: {decryptedValue}</p>
              <p>Symmetric Key Used: {symmetricKey}</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Encryption;
