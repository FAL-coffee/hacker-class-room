import * as routes from "@routes";

import { HeaderLink, UserMenu } from "@types";

export const links: Array<HeaderLink> = [
  { key: "top", name: "トップページ" },
  { key: "home", name: "ホームへ戻る" },
  { key: "roomList", name: "チャットルーム一覧" },
];
export const userMenu: Array<UserMenu> = [
  { key: "profile", name: "プロフィール情報" },
  { key: "logout", name: "ログアウト" },
];

describe("Test pagination in the header.", () => {
  it("when md displaying, all links should work.", () => {
    // ["home", "top", "roomList"].forEach((link) => {
    links.forEach((link, i: number) => {
      cy.visit("/");
      // cy.get("[data-cy=link-to-about]").click();
      cy.get(`[data-cy=pagination-link-md-${link.key}]`).click();
      let uri: string = "";
      if (link.key === "home") uri = routes.HOME;
      else if (link.key === "top") uri = routes.TOP;
      else if (link.key === "roomList") uri = routes.ROOM_LIST;
      cy.url().should("include", uri);
    });
  });

  it("when under md displaying, all links should work.", () => {
    // ["home", "top", "roomList"].forEach((link) => {
    cy.viewport(550, 750);
    links.forEach((link, i: number) => {
      cy.visit("/");
      // cy.get("#app-header_link-menu").click({ force: true });
      // cy.get("[data-cy=link-to-about]").click();
      cy.get(`[data-cy=pagination-link-xs-${link.key}]`).click({ force: true });
      let uri: string = "";
      if (link.key === "home") uri = routes.HOME;
      else if (link.key === "top") uri = routes.TOP;
      else if (link.key === "roomList") uri = routes.ROOM_LIST;
      cy.url().should("include", uri);
    });
  });
});
