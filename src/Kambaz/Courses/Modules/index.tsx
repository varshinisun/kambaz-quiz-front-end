import ModulesControls from "./ModulesControls";
import "./index.css";
import { useParams } from "react-router";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser); 
  const dispatch = useDispatch();

  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };

  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };

  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);

  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div className="container">
    {isFaculty && (
      <div className="modules-controls-wrapper mb-3">
        <ModulesControls 
          setModuleName={setModuleName} 
          moduleName={moduleName}         
          addModule={createModuleForCourse}
        />
      </div>
    )}


      <div className="module-list-wrapper mt-4">
        <ListGroup className="rounded-0">
          {modules
            // .filter((module: any) => module.course === cid)
            .map((module: any) => (
              <ListGroup.Item key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray w-100">
                
                <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />

                    {!module.editing ? (
                      <span>{module.name}</span> 
                    ) : (
                      isFaculty && ( 
                        <FormControl 
                          className="w-50 d-inline-block"
                          onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              saveModule({ ...module, editing: false });
                            }
                          }}
                          defaultValue={module.name}
                        />
                      )
                    )}
                  </div>

                  {isFaculty && (
                    <ModuleControlButtons 
                      moduleId={module._id}
                      deleteModule={(moduleId) => removeModule(moduleId)}
                      editModule={(moduleId) => dispatch(editModule(moduleId))}
                    />
                  )}
                </div>

                {module.lessons && (
                  <ListGroup className="wd-lessons rounded-0">
                    {module.lessons.map((lesson: any) => (
                      <ListGroup.Item key={lesson._id} className="wd-lesson p-3 ps-1 d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3" />
                        {lesson.name}
                        {isFaculty && <LessonControlButtons />}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}

              </ListGroup.Item>
            ))}
        </ListGroup>
    </div>
    </div>
  );
}
