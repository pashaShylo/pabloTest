"use client";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { createUserResult } from "@/actions";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useSnackbar } from "notistack";

const App = () => {
  const [listItems, setListItems] = useState([
    { id: "1", number: 1, title: "Half-Life", genre: "Sci-Fi FPS" },
    { id: "2", number: 2, title: "Portal 2", genre: "Puzzle-Platformer" },
    {
      id: "3",
      number: 3,
      title: "The Witcher 3: Wild Hunt",
      genre: "Open World RPG",
    },
    {
      id: "4",
      number: 4,
      title: "Civilization VI",
      genre: "Turn-Based Strategy",
    },
    { id: "5", number: 5, title: "Stardew Valley", genre: "Simulation RPG" },
    { id: "6", number: 6, title: "Minecraft", genre: "Sandbox" },
    {
      id: "7",
      number: 7,
      title: "Grand Theft Auto V",
      genre: "Open World Action-Adventure",
    },
    { id: "8", number: 8, title: "League of Legends", genre: "MOBA" },
    { id: "9", number: 9, title: "DOTA 2", genre: "MOBA" },
    {
      id: "10",
      number: 10,
      title: "The Elder Scrolls V: Skyrim",
      genre: "Open World RPG",
    },
  ]);

  const [userName, setUserName] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const copyTodos = [...listItems];
    const [reorderTodo] = copyTodos.splice(startIndex, 1);
    copyTodos.splice(endIndex, 0, reorderTodo);
    setListItems(copyTodos);
  };

  return (
    <div
      style={{
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: 50,
        paddingBottom: 50,
      }}
    >
      <Input
        variant="bordered"
        size="sm"
        className="mb-2"
        placeholder="Введіть своє ім'я"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className=" flex flex-col"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listItems.map((elem, index) => {
                return (
                  <Draggable key={elem.id} draggableId={elem.id} index={index}>
                    {(provided) => (
                      <li
                        className=" p-2 mb-2 bg-slate-500 rounded-lg text-white"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <p className=" flex gap-3">
                          <span> {elem.number}</span>
                          <span> {elem.title}</span>
                        </p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        color="primary"
        onClick={async () => {
          try {
            await createUserResult({ userResults: listItems, userName });

            enqueueSnackbar("Ваші відповіді успішно відправлені", {
              variant: "success",
            });
          } catch (error) {
            enqueueSnackbar("Введенні дані не коректні", { variant: "error" });
          }
        }}
        className="mt-4"
      >
        Відправити
      </Button>
    </div>
  );
};

export default App;
