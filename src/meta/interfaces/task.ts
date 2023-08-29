export interface TaskSchema {
  title: string,
  description: string,
}

export interface Task extends TaskSchema {
  id: string,
  createDate: Date,
}

export interface CreateTaskPayloadRequest extends TaskSchema {}

export interface UpdateTaskPayloadRequest extends TaskSchema {
  id: string
}
