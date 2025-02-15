import {
  Divider,
  Group,
  Loader,
  Image as MantineImg,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconDownload, IconX } from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { DebouncedSlider } from "../debounced-slider";
import classes from "../drop-zone-button/DropzoneButton.module.css";
import { useMosaicImage } from "./use-mosaic-image";

export function DropzoneButton() {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [value, setValue] = useState(10);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const mosaicImage = useMosaicImage();

  // 画像を読み込んで表示
  const handleDrop = useCallback((files: File[]) => {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) setImageSrc(e.target.result as string);
    };

    reader.readAsDataURL(file);
  }, []);

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const url = mosaicImage(img, value);
        if (url) setProcessedSrc(url);
        return;
      };
    }
  }, [imageSrc, mosaicImage, value]);

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={handleDrop}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
        maxSize={30 * 1024 ** 2}
      >
        <div style={{ pointerEvents: "none" }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload
                size={50}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload size={50} stroke={1.5} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>画像をアップロード</Dropzone.Accept>
            <Dropzone.Reject>
              30MB以下のJPEG/PNGファイルのみアップロード可能です
            </Dropzone.Reject>
            <Dropzone.Idle>画像を選択してください</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            ドラッグ&ドロップまたはクリックでアップロードできます。
            <br />
            30MB以下のJPEG/PNGファイルのみアップロード可能です。
          </Text>
        </div>
      </Dropzone>

      <DebouncedSlider
        value={value}
        onChange={setValue}
        onChangeBeforeDebounce={() => setProcessedSrc(null)}
      />

      {/* 元画像と変換後の画像を表示 */}
      {imageSrc && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <MantineImg src={imageSrc} alt="Uploaded" maw={240} />
          <Divider />
          {processedSrc ? (
            <MantineImg
              src={processedSrc}
              alt="Processed"
              maw={240}
              nonce="nodata"
            />
          ) : (
            <div style={{ alignContent: "center" }}>
              <Loader />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
