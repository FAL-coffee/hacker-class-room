import type { NextPage } from "next";
import Image from "next/image";
// import { useAuth } from "@/context/AuthContext";
import { Layout } from "@components/layout";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const Description = () => {
  return (
    <>
      <h1>Hakacla（はかくら）とは</h1>
      <ul>
        <li>
          <p>プログラミングの授業が始まるけど、付いていけるか不安......</p>
        </li>
        <li>
          <p>
            情報処理の勉強が難しい。もしかして、こんなに苦労しているのは私だけ？
          </p>
        </li>
        <li>
          <p>
            ゲーム作りに興味があって、プログラミングを始めてみたいけど、何から始めればいいのかわからない
          </p>
        </li>
        <li>
          <p>ネットで見た通りにやったのに、環境構築でつまずいてしまった。</p>
        </li>
        <li>
          <p>
            プログラミングの知見を活かして、学生起業を行いたい。仲間をどうやって見つければいいだろうか？
          </p>
        </li>
      </ul>
      <b>
        そういった若いエンジニアに多い悩みを、
        <br />
        協力し合い共に乗り越える仲間を探すことが出来るコミュニティサービスです。
      </b>
      <Box style={{ marginTop: "40px" }}>
        <p>
          現在はβ版ですが、皆様の声によってHakaclaは進化していきます。
          <br />
          <a href="https://twitter.com/Itamaster_">twitter</a>
          までご意見お寄せください。
        </p>
      </Box>
    </>
  );
};

const Top: NextPage = () => {
  return (
    <Layout title="Hakacla">
      <Container>
        <Stack direction="row" sx={{ display: { xs: "none", md: "flex" } }}>
          <Image src="/main.png" alt="" width="700px" height="700px" />
          <Box sx={{ mt: "10%" }}>
            <Description />
          </Box>
        </Stack>

        <Stack direction="column" sx={{ display: { xs: "flex", md: "none" } }}>
          <Image src="/main.png" alt="" width="700px" height="700px" />
          <Box>
            <Description />
          </Box>
        </Stack>
      </Container>
    </Layout>
  );
};

export default Top;
