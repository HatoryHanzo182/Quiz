interface UserData
{
    name: string;
    surname: string;
    email: string;
    login: string;
    hesh_pass: string;
    teacher_code: string;
}

interface TeacherMenuProps 
{
    userData: UserData;
}

export default UserData;
export type { UserData };
export type { TeacherMenuProps };