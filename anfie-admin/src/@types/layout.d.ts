type TModalRef = {
  showModal: () => void;
  closeModal: () => void;
};
type TDrawerRef = {
  showDrawer: () => void;
  closeDrawer: () => void;
};

type TDetailPage = {
  params: {
    id: string;
  };
};