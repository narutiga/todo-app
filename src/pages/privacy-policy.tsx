import { Container, Flex, Footer, Text, Title } from "@mantine/core";
import React from "react";

const Data = [
  {
    clause: 1,
    article: "収集する情報",
    content:
      "当アプリは、以下の情報を収集することがあります。\n\n・ ユーザーが入力したTODOリストの内容\n・ Google認証により取得したユーザーの氏名\n・ Google認証により取得したユーザーのメールアドレス",
  },
  {
    clause: 2,
    article: "情報の利用目的",
    content:
      "当アプリが収集した情報は、以下の目的で利用されます。\n\n・ TODOリストの表示・管理\n・ アカウント認証およびユーザー識別\n・ ユーザーサポートやお問い合わせ対応",
  },
  {
    clause: 3,
    article: "第三者への情報提供",
    content:
      "当アプリは、法令に基づく場合や適切な理由があると判断した場合を除き、ユーザーの情報を第三者に提供しません。",
  },
  {
    clause: 4,
    article: "情報の管理",
    content:
      "当アプリは、収集した情報を適切に管理し、情報漏えいや不正アクセス、情報の紛失・破壊・改ざん等のリスクに対して適切な対策を講じます。",
  },
  {
    clause: 5,
    article: "プライバシーポリシーの改定",
    content:
      "当アプリは、法令の改正やアプリ機能の変更等の事情により、本プライバシーポリシーを改定することがあります。改定されたプライバシーポリシーは、本アプリ内で告知し、適用されます。",
  },
];

const PrivacyPolicy = () => {
  return (
    <Flex direction="column">
      <Container p="4rem" mih="100vh" w="100%">
        <Title order={2} mb="xl" c="gray.8">
          プライバシーポリシー
        </Title>
        <Text c="gray.7">
          このTodoアプリ（以下、「当アプリ」といいます。）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。当アプリが収集・利用する情報とその目的、および情報管理について、以下の通りプライバシーポリシーを定めます。
        </Text>
        {Data.map((data) => {
          return (
            <div key={data.clause}>
              <Title order={3} my="md" c="gray.8" size="h4">
                第{data.clause}条 {data.article}
              </Title>
              <Text c="gray.7">
                {data.content.split("\n").map((line, index) => {
                  return (
                    <React.Fragment key={index}>
                      {line}
                      {index < data.content.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  );
                })}
              </Text>
            </div>
          );
        })}
      </Container>
      <Footer height={60}>
        <Text mt="1rem" c="gray" ta="center">
          &copy; 2023 Todo
        </Text>
      </Footer>
    </Flex>
  );
};

export default PrivacyPolicy;
