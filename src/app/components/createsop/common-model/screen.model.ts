export interface Screen {
  applicationName: string;
  screenName: string;
  tabName: string;
  imageUrl: string;
  imageId?: number;
  screenId?: number;
}

export const dummyBlankScreen: Screen = {
  applicationName: "No Application name",
  screenName: "No Screen name",
  tabName: "No Tab name",
  imageUrl: "../../../../assets/pics/no image.svg",
  imageId: null,
  screenId: null,
};
