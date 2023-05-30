interface UserData
{
    name: string;
    surname: string;
    email: string;
    login: string;
    hesh_pass: string;
    teacher_code: string;
    id: string;
}

interface TeacherMenuProps 
{
    userData: UserData;
}

export type { UserData };
export type { TeacherMenuProps };