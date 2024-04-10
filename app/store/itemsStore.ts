import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useItemsStore = create(
  persist(
    (set, get) => ({
      listItems: [
        {
          id: "1",
          number: "1",
          title: "First item",
          isSelected: false,
        },
        {
          id: "2",
          number: "2",
          title: "Second item",
          isSelected: false,
        },
        {
          id: "3",
          number: "3",
          title: "Third item",
          isSelected: false,
        },
        {
          id: "4",
          number: "4",
          title: "Fourth item",
          isSelected: false,
        },
        {
          id: "5",
          number: "5",
          title: "Fifth item",
          isSelected: false,
        },
      ],
      counter: 0,
      setListItems: (items) => {
        set((state) => ({
          listItems: [...items],
        }));
      },
      setCounter: (amount) => {
        set((state) => ({
          counter: amount,
        }));
      },
    }),
    {
      name: "items-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useItemsStore;
